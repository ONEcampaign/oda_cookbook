# Tips and Tricks

Want to take your ODA cooking to the next level? This section dives deeper into the `oda-data` package, with additional
features to help you gather insights like a chef.

## Providers

To view a list of all available providers and their codes:

```python
from oda_data import OECDClient

providers = OECDClient.available_providers()
```

#### Provider Groupings

Predefined provider groups are available to retrieve data by specific categories:

```python
from oda_data.tools.groupings import provider_groupings

provider_groups = provider_groupings()
```

These are the available donor groupings:

| Group Name          | Description                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------------------------------------|
| `dac_members`       | Development Assistance Committee (DAC) countries and EU institutions. <br/>**Caution**: Prone to double-counting.   |
| `dac_countries`     | DAC countries only. <br/>**Tip**: Use this group when looking for total ODA contributions from the DAC.             |
| `non_dac_countries` | Non-DAC donor countries.                                                                                            |
| `multilateral`      | Multilateral organizations.                                                                                         |
| `all_bilateral`     | Combination of `dac_countries` and `non-dac_countries`.                                                             |
| `all_official`      | Combination of `dac_countries`, `non-dac_countries` and `multilateral`. <br/>**Caution**: Prone to double-counting. |
| `g7`                | G7 member countries.                                                                                                |
| `eu27_total`        | EU countries and EU institutions.                                                                                   |
| `eu27_countries`    | EU countries only.                                                                                                  |
| `private_donors`    | Private donors, such as foundations and national lotteries.                                                         |
| `dac1_aggregates`   | Combination of `all_official`, `g7`, `private_donors`, and development banks.                                       |

## Recipients

To view a list of all available recipients:

```python
from oda_data import OECDClient

reicipients = OECDClient.available_recipients()
```

#### Recipient Groupings

Predefined recipient groups are also available:

```python
from oda_data.tools.groupings import recipient_groupings

recipients_groups = recipient_groupings()
```

These are the predefined recipient groupings:

| Group Name                         | Description                                                                                                                                      |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `all_recipients`                   | All recipient countries/regions and multilateral organisations. <br/>**Caution**: Prone to double-counting.                                      |
| `all_developing_countries_regions` | Developing countries and regions. <br/>**Tip**: Use this group when looking for total ODA received by developing countries.                      |
| `african_countries`                | African countries only.                                                                                                                          |
| `africa_regional`                  | Regional aggregations for Africa.                                                                                                                |
| `african_countries_regional`       | Combination of `african_countries` and `africa_regional`. <br/>**Tip**: Use this group when looking for total ODA received by African countries. |
| `sahel`                            | Sahel region countries.                                                                                                                          |
| `ldc_countries`                    | Least Developed Countries (LDCs).                                                                                                                |
| `france_priority`                  | Priority countries for France.                                                                                                                   |
| `dac2a_aggregates`                 | Aggregate groups, such as regions, LDCs, and developing countries.                                                                               |


[//]: # (### Measures)

[//]: # ()
[//]: # (These are the available measures:)

[//]: # ()
[//]: # (| Measure Name                   | Description                                               |)

[//]: # (|--------------------------------|-----------------------------------------------------------|)

[//]: # (| `net_disbursement`             | Sum between `gross_disbursement` and `received`           |)

[//]: # (| `gross_disbursement`           |                                                           |)

[//]: # (| `gross_disbursement_non_grant` |                                                           |)

[//]: # (| `net_disbursement_grant`       |                                                           |)

[//]: # (| `received`                     |                                                           |)

[//]: # (| `commitment`                   | Sum between `commitment_grant` and `commitment_non_grant` |)

[//]: # (| `commitment_grant`             | ODA grant commitments                                     |)

[//]: # (| `commitment_non_grant`         | ODA non-grant commitments                                 |)

[//]: # (| `grant_equivalent`             | ODA in grant equivalents                                  |)

[//]: # (| `expert_commitment`            |                                                           |)

[//]: # (| `expert_extended`              |                                                           |)

[//]: # (| `export_credit`                |                                                           |)