import pandas as pd
import glob
import os
from sqlalchemy import create_engine

# -----------------------
# 1. Database connection
# -----------------------
db_user = "postgre"
db_password ="glpostgre"   # <-- change this
db_host = "localhost"
db_port = "5432"
db_name = "sample_db"

engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")

# -----------------------
# 2. Read all CSV files
# -----------------------

# List of CSV files to process (update paths as needed)
files = [
    "C:\\Users\\Admin\\Zero1\\CentralReport12-13.csv",
    "C:\\Users\\Admin\\Zero1\\CentralReport16-17.csv",
    "C:\\Users\\Admin\\Zero1\\CentralReport19-20.csv",
    "C:\\Users\\Admin\\Zero1\\CentralReport21-22.csv",
    "C:\\Users\\Admin\\Zero1\\CentralReport22-23.csv",
    "C:\\Users\\Admin\\Zero1\\CentralReport23-24.csv"
]

print("Found files:", files)

if not files:
    print("No CSV files found. Please check the file paths.")
    exit(1)

dfs = []

for file in files:
    print(f"Processing {file} ...")

    # Read CSV, skip first 5 metadata rows
    df = pd.read_csv(file, skiprows=5)

    # Extract year info from filename
    filename = os.path.basename(file)
    year = filename.replace("CentralReport", "").replace(".csv", "")
    df["report_year"] = year

    dfs.append(df)

# -----------------------
# 3. Combine all DataFrames
# -----------------------
all_reports = pd.concat(dfs, ignore_index=True)

print("Combined dataframe shape:", all_reports.shape)

# -----------------------
# 4. Auto-create table in PostGIS
# -----------------------
# "replace" = drop + recreate table
# "append"  = add rows if table exists
table_name = "reports"

all_reports.to_sql(table_name, engine, if_exists="replace", index=False)

print(f"✅ Data successfully loaded into PostGIS table '{table_name}'")

