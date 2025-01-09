# Background Processes

While the `oda-data` package makes accessing ODA data straightforward, several processes happen behind the scenes as the different methods of the `ODAData` class are called. This section provides a deeper look into its two main methods; `load_indicator` and `get_data`.

## `load_indicator`

This method takes care of loading and preparing the data for the requested indicators by performing the following steps:

**1. Check**: The method verifies if the specified indicators exist in `_indicators_json`, which is loaded from `indicators.json` during initialization. This file, located in `oda_data/settings/indicators.json`, contains metadata about each indicator, such as its `source` (e.g., dac1, dac2a, crs, multisystem) and `type` (see step 3).

**2. Load**: If the raw data for an indicator is not already loaded, the method calls the appropriate data reading function based on the indicator's `source`. These helper functions are defined in `oda_data/read_data/read` and retrieve data from the relevant ODA tables.

**3. Process**: The loaded data is processed depending on the indicator's `type`:

   - `dac`: Filters the data directly using `ODAData._filter_indicator_data`.
   - `one`: Builds the indicator by combining other `dac` indicators via `ODAData._build_one_indicator`.
   - `one_linked`: Applies fallback logic to handle missing data through `ODAData._build_linked_indicator`.
   - `one_research`: Processes the data using `ODAData._build_research_indicator`.

**4. Convert**: Data values are converted to a different currency via `dac_exchange` and adjusted for inflation through `dac_deflate`, as needed. These two functions are defined in `oda_data/clean_data/common`.

**5. Save**: The final processed data is stored in `ODAData.indicators_data[indicator]` for later use.

## `get_data`

This method retrieves and combines the processed data into a structured format by performing these steps:

**1. Fetch**: The method retrieves the appropriate data for the loaded indicators from `ODAData.indicators_data`.

**2. Combine**: All DataFrames for the different indicators are concatenated into a single DataFrame.

**3. Transform**:

   - The data is grouped and summarized using `simplify_output_df`, located in `oda_data/classes/oda_data`.
   - Contextual names are added using `add_names`, defined in `oda_data/classes/oda_data`.
   - Additional columns are created based `add_share_of_total` and `add_share_gni`.
   - Columns are reordered for consistency and readability using `reorder_columns`, located in `oda_data/clean_data/common`.
