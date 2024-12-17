# oda-data Package
The `oda-data` package is ONE's primary way of retrieving ODA data. The package lives in a [GitHub repository](https://github.com/ONEcampaign/oda_data_package) and can be installed with pip:

```python
pip install oda-data --upgrade
```

## The `ODAData` class

The `ODAData` class is central to this pacakge and helps with:
- Loading ODA data for specific years, donors, recipients and currency. 
- Aggregating and filtering the data based on custom indicators or dimensions.
- Summarizing results, and computing shares.

### Class attributes

| Attribute       | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `years`         | List of years to include in the data. Default is an empty list (all years). |
| `donors`        | List of donor codes. Default is `None` (all donors).                        |
| `recipients`    | List of recipient codes. Default is `None` (all recipients).                |
| `currency`      | Currency for data (e.g., `USD`, `EUR`, `GBP`, `CAD`). Default is `USD`.     |
| `prices`        | Pricing mode: `current` (default) or `constant`.                            |
| `base_year`     | Base year for constant prices. Required if `prices` is set to `constant`.   |
| `include_names` | Whether to include names in the data. Default is `False`.                   |


### Core Methods

#### Initialization

Initializes an `ODAData` object with the specified attributes and ensures that input parameters are valid.

```python
ODAData()
```

#### Loading indicators
Use the method `load_indicator(indicators: str | list[str])` on a class instance to load data for one or more indicators. Any parameters specified during initialization are applied to the data:

```python
ODAData().load_indicators()
```

To see a list of available indicators, use the method `available_indicators()` on an initialized class: 

```python
print(ODAData().available_indicators())
```

See the [Appendix](#appendix_loadindicator) for more details on this method.

#### Retrieving data
Use `get_data(indicators: str | list[str] = 'all')` on a class instance to retrieve a pandas DataFrame with the specified attributes and indicators:

```python
ODAData().get_data()
```

See the [Appendix](#appendix_getdata) for more details on this method.

### Additional methods

#### Donors
To see a list of all donors, use the method `available_donors()` on a class instance:

```python
print(ODAData().available_donors())
```

Additionally, the `tools.groupings` module contains a dictionary with predefined donor groups:

```python
from oda_data.tools.groupings import donor_groupings

print(donor_groupings()) # Prints available groups and group breakdown
print(list(donor_groupings())) # Prints available groups
```

See the [Appendix](#appendix_donors) for a description of available groups.

#### Recipients
To see a list of all recipients, use the method `available_recipients()` on a class instance:

```python
print(ODAData().available_recipients())
```

Additionally, the `tools.groupings` module contains a dictionary with predefined recipient groups:

```python
from oda_data.tools.groupings import recipient_groupings

print(recipient_groupings()) # Prints available groups and group breakdown
print(list(recipient_groupings())) # Prints available groups
```

See the [Appendix](#appendix_recipients) for a description of availalble groups.

#### Computing shares
The method `add_share_of_total(include_share_of: bool = False)` adds a column to the output showing values as a percentage of total ODA.

```python
ODAData().add_share_of_total(True)
```

The method `add_share_gni()` adds a column to the output showing values as a percentage of GNI (Gross National Income).

```python
ODAData().add_share_gni()
```

## Code Walkthrough

This section presents the basic usage of the `oda-data` package. The following script retrieves total ODA according to the official definition in constant 2021 Euros, for the 2018-2021 period.

```python
from oda_data import ODAData, set_data_path

# set the path to the folder where the data should be stored
set_data_path("path/to/data/folder")

# create object, specifying key details of the desired output
oda = ODAData(
   years=range(2018, 2022), currency="EUR", prices="constant", base_year=2021, include_names=True
)

# load indicator
oda.load_indicator(indicators=["total_oda_official_definition"])

# get the data
data = oda.get_data()

print(data.head())
```

The resulting DataFrame should look like this:

| year | indicator                     | donor_code | donor_name | currency | prices   | value        |
|------|-------------------------------|------------|------------|----------|----------|--------------|
| 2018 | total_oda_official_definition | 1          | Austria    | EUR      | constant | 1054.254302  |
| 2018 | total_oda_official_definition | 2          | Belgium    | EUR      | constant | 2089.360102  |
| 2018 | total_oda_official_definition | 3          | Denmark    | EUR      | constant | 2352.403505  |
| 2018 | total_oda_official_definition | 4          | France     | EUR      | constant | 10863.209771 |
| 2018 | total_oda_official_definition | 5          | Germany    | EUR      | constant | 22682.598838 |

For a more comprehensive set of use-cases, refer to the [Case Studies page](./case_studies).

## Appendix

<a id="appendix_donors"></a>
### Donor groupings

The following table shows the donor groupings available in `donor_groupings()`:

| Group Name              | Description                                                                                                       |
|-------------------------|-------------------------------------------------------------------------------------------------------------------|
| `dac_members`           | Development Assistance Committee (DAC) countries and EU institutions. <br/>**Caution**: Prone to double-counting. |
| `dac_countries`         | DAC  countries. Use this group when looking for total ODA contributions from DAC countries.                       |
| `non_dac_countries`     | Non-DAC donor countries.                                                                                          |
| `multilateral`          | Multilateral organizations.                                                                                       |
| `all_bilateral`         | Combination of DAC and non-DAC countries.                                                                         |
| `all_official`          | Combination of DAC, non-DAC countries and multilateral organizations.                                             |
| `g7`                    | G7 member countries.                                                                                              |
| `eu27_total`            | EU countries and institutions.                                                                                    |
| `eu27_countries`        | EU countries excluding institutions.                                                                              |
| `dac1_aggregates`       | Aggregate groups, development banks and private donors.                                                           |
| `private_donors`        | Private donors such as foundations and lotteries.                                                                 |

<a id="appendix_recipients"></a>
### Recipient groupings

The following table shows the recipient groups available in `recipient_groupings()`:

| Group Name                         | Description                                                                                                                  |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `all_recipients`                   | All recipient countries/regions and multilateral organisations. <br/>**Caution**: Prone to double-counting.                  |
| `all_developing_countries_regions` | Developing countries and regions. Use this group when looking for total ODA contributions of a single or group of donors.    |
| `african_countries`                | African countries.                                                                                                           |
| `africa_regional`                  | Regional aggregations for Africa.                                                                                            |
| `african_countries_regional`       | Combination of `african_countries` and `africa_regional`. Use this group when looking for total ODA contributions to Africa. |
| `sahel`                            | Sahel region countries.                                                                                                      |
| `ldc_countries`                    | Least Developed Countries (LDCs).                                                                                            |
| `france_priority`                  | Priority countries for France.                                                                                               |
| `dac2a_aggregates`                 | Aggregate groups, such as regions, LDCs, and developing countries.                                                           |

### Background processes
While the `oda-data` package makes getting ODA data easy, there are several processes happening under the hood as the different methods of the `ODAData` class are called. This section dives deeper into the `load_indicator` and `get_data` methods. 

<a id="appendix_loadindicator"></a>
#### `load_indicator`

1. The method checks whether the specified indicators exist in `_indicators_json`, which is loaded on `ODAData` from `indicators.json`. This file is in `oda_data/settings/indicators.json` and contains information about each indicator, including `source` and `type`.
2. If the raw data for the `source` of an indicator has not already been loaded, it calls on the appropriate data reading function. These helper function are defined in the `oda_data.read_data.read` module and read the data from the different OECD tables, i.e. DAC1, DAC2A, CRS and Multisystem.
3. Each indicator is processed based on its `type`:
    - **DAC indicators**: Filters data directly using `ODAData._filter_indicator_data`.
    - **ONE indicators**: Builds the indicator by combining other raw indicators via `ODAData._build_one_indicator`.
    - **Linked indicators**: Uses fallback logic to handle missing data via `ODAData._build_linked_indicator`.
    - **Research indicators**: Executes processing via `ODAData._build_research_indicator`.
4. Data values are converted appropriately using `dac_exchange` or `dac_deflate`, are defined in the `oda_data.clean_data.common` module.
5. The processed data is saved to `ODAData.indicators_data[indicator]`

<a id="appendix_getdata"></a>
#### `get_data`

1. The method fetches the appropriate data for the loaded indicators.
2. All DataFrames for the different indicators are concatenated into a single DataFrame.
3. The resulting DataFrame is transformed as follows:
   - Values are grouped and summarized via `simplify_output_df` and contextual names are added via `add_names`. 
   - Columns added based on `add_share_of_total`, `add_share_gni`. 
   - Columns are arranged for consistency and readability via `oda_data.clean_data.common.reorder_columns`.