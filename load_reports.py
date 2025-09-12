import pandas as pd
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

dfs = []
for file in files:
    print(f"Processing {file} ...")
    # Read first 3 header rows
    header_rows = pd.read_csv(file, header=None, nrows=3, skiprows=7)
    # Read the actual data
    df = pd.read_csv(file, header=None, skiprows=10)
    # Combine headers and make unique column names
    columns = []
    for col in range(df.shape[1]):
        h1 = str(header_rows.iloc[0, col]) if not pd.isna(header_rows.iloc[0, col]) else ""
        h2 = str(header_rows.iloc[1, col]) if not pd.isna(header_rows.iloc[1, col]) else ""
        h3 = str(header_rows.iloc[2, col]) if not pd.isna(header_rows.iloc[2, col]) else ""
        # Combine all header levels, separated by underscores
        col_name = "_".join([h for h in [h1, h2, h3] if h])
        # If still empty, use generic name
        columns.append(col_name if col_name else f"col_{col}")
    # Ensure column names are unique
    seen = {}
    unique_columns = []
    for name in columns:
        if name in seen:
            seen[name] += 1
            unique_columns.append(f"{name}_{seen[name]}")
        else:
            seen[name] = 1
            unique_columns.append(name)
    df.columns = unique_columns
    dfs.append(df)

# -----------------------
# 3. Combine all DataFrames
# -----------------------
all_reports = pd.concat(dfs, ignore_index=True)

print("Combined dataframe shape:", all_reports.shape)
print("Columns:", all_reports.columns.tolist())

# -----------------------
# 4. Auto-create table in PostGIS
# -----------------------
# "replace" = drop + recreate table
# "append"  = add rows if table exists
table_name = "reports"

all_reports.to_sql(table_name, engine, if_exists="replace", index=False)

print(f"✅ Data successfully loaded into table '{table_name}' with unique column names.")

