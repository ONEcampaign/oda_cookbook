# Tips and Tricks

Want to take your cooking to the next level? This section dives deeper into the `oda-data` package, with additional features to help you whip up insights like a chef.

## Computing Shares

The `oda-data` package provides methods to easily compute shares of total ODA or Gross National Income (GNI):

### Share of Total ODA

To add a column showing values as a percentage of total ODA, run the following method before `get_data`:

  ```python
  ODAData().add_share_of_total(True)
  ```

### Share of GNI

You can add a column showing ODA values as a percentage of (Gross National Income) GNI as follows:

  ```python
  ODAData().add_share_gni(True)
  ```

## Donors

To view a list of all available donors:

```python
ODAData().available_donors()
```

### Donor Groupings
Predefined donor groups are available to retrieve donor data by specific categories:

```python
from oda_data.tools.groupings import donor_groupings

donor_groupings()
```

These are the available donor groupings:

| Group Name              | Description                                                                                                       |
|-------------------------|-------------------------------------------------------------------------------------------------------------------|
| `dac_members`           | Development Assistance Committee (DAC) countries and EU institutions. <br/>**Caution**: Prone to double-counting. |
| `dac_countries`         | DAC countries. Use this group when looking for total ODA contributions from DAC countries.                        |
| `non_dac_countries`     | Non-DAC donor countries.                                                                                          |
| `multilateral`          | Multilateral organizations.                                                                                       |
| `all_bilateral`         | Combination of `dac_countries` and `non-dac_countries`.                                                           |
| `all_official`          | Combination of `dac_countries`, `non-dac_countries` and `multilateral`.                                           |
| `g7`                    | G7 member countries.                                                                                              |
| `eu27_total`            | EU countries and institutions.                                                                                    |
| `eu27_countries`        | EU countries excluding institutions.                                                                              |
| `private_donors`        | Private donors such as foundations and lotteries.                                                                 |
| `dac1_aggregates`       | Combination of `all_official`, `g7`, `private_donors`, development banks and private donors.                      |


## Recipients

You can view a list of all available recipients:

```python
ODAData().available_recipients()
```

### Recipient Groupings

Predefined recipient groups are also available:

```python
from oda_data.tools.groupings import recipient_groupings

recipient_groupings()
```

These are the available recipient groupings:

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

