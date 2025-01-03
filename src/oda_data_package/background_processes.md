# Background Processes

While the `oda-data` package makes accessing ODA data straightforward, several processes happen behind the scenes as the different methods of the `ODAData` class are called. This section provides a deeper look into its two main methods; `load_indicator` and `get_data`.

## `load_indicator`

This method handles loading and preparing the requested indicators by performing the following steps:

1. **Check for indicators**: The method verifies if the specified indicators exist in `_indicators_json`, which is loaded from `indicators.json` during initialization. This file, located in `oda_data/settings/indicators.json`, contains metadata about each indicator, such as its `source` (e.g., dac1, dac2a, crs, multisystem) and `type` (explained below).

2. **Load raw data**: If the raw data for an indicator is not already loaded, the method calls the appropriate data reading function based on the indicator's `source`. These helper functions are defined in `oda_data.read_data.read` and retrieve data from the relevant ODA tables.

3. **Process the data**: Depending on the indicator's `type`, the data is processed using different methods:

    - **`dac`**: Filters the data directly using `ODAData._filter_indicator_data`.
    - **`one`**: Builds the indicator by combining other raw indicators via `ODAData._build_one_indicator`.
    - **`one_linked`**: Applies fallback logic to handle missing data through `ODAData._build_linked_indicator`.
    - **`one_research`**: Processes the data using `ODAData._build_research_indicator`.

4. **Convert values**: Data values are converted as needed using the functions `dac_exchange` or `dac_deflate`, which are defined in `oda_data.clean_data.common`.

5. **Save processed data**: The final processed data is stored in `ODAData.indicators_data[indicator]` for later use.

## `get_data`

This method retrieves and combines the processed data into a structured format by performing these steps:

1. **Fetch loaded data**: The method retrieves the appropriate data for the loaded indicators from `ODAData.indicators_data`.

2. **Combine data**: All DataFrames for the different indicators are concatenated into a single DataFrame.

3. **Transform the output**:

    - The data is grouped and summarized using `oda_data.classes.oda_data.simplify_output_df`.
    - Contextual names are added using `oda_data.classes.oda_data.add_names`.
    - Additional columns are created based on the options `add_share_of_total` and `add_share_gni`.
    - Columns are reordered for consistency and readability using `oda_data.clean_data.common.reorder_columns`.
