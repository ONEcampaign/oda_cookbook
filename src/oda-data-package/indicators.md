# Indicators

The `oda-data` package defines a nomenclature for ODA indicators. This section outlines how indicators are defined and
retrieved.

Indicator codes consist of a series of IDs separated by a period (`.`).

## Source IDs

The first part of an indicator code refers to its source. Currently, the package supports indicators from the following
sources:

- `DAC1`, for [DAC1](../oda-data/dac1) data
- `DAC2A`, for [DAC2A](../oda-data/dac2a) data
- `CRS`, for [CRS](../oda-data/crs) data
- `ONE`, for ONE custom indicators

As a result, indicator codes must follow the format `DAC1.xxxx`, `DAC2A.xxxx`, `CRS.xxxx`, or `ONE.xxxx`.

## Flow type IDs

The second part of an indicator code represents the flow type. Available options include:

- `10`: ODA (Official Development Assistance)
- `21`: OOF (Other Official Flows)
- `22`: Officially supported export credits
- `30`: Private development finance
- `36`: Private foreign direct investment
- `37`: Other private market
- `40`: Non flow
- `50`: Other flows (e.g. the non-ODA component of peacekeeping operations)
- `60`: Private sector instruments

Including the flow type, indicators should be of the form `DAC1.37.xx`, `DAC2.10.xx`, `CRS.21.xx` or `ONE.40.xx`.

## Source-specific IDs

The final part of the indicator code is source-specific.

### DAC1

DAC1 indicators are based on the `measure` variable. Note that while
the [OECD Data Explorer](https://data-explorer.oecd.org/vis?tm=DAC1&pg=0&snb=1&df[ds]=dsDisseminateFinalDMZ&df[id]=DSD_DAC1%2540DF_DAC1&df[ag]=OECD.DCD.FSD&df[vs]=1.3&dq=DAC.....Q.&lom=LASTNPERIODS&lo=10&to[TIME_PERIOD]=false)
refers to this variable as `measure`, it is called `aid_type` in the OECD.Stat schema.

DAC1 indicators follow the format:

`DAC1.[flow type].[measure]`

For example,

- Bilateral ODA (measure ID 1015) → `DAC1.10.1015`
- OFF Budget support (measure ID 2210) → `DAC1.40.2210`
- Private flows at market terms (measure ID 3300) → `DAC1.50.3300`

### DAC2A

DAC2A indicators also use `measure`, with the same format as DAC1, except DAC2A includes only ODA data. Thus, DAC2A
indicators follow the format:

`DAC2A.10.[measure]`

For example,

- Humanitarian aid (measure ID 216) → `DAC2A.10.216`
- Imputed multilateral ODA (measure ID 106) → `DAC2A.10.106`
- Debt-forgiveness (measure ID 212) → `DAC2A.10.212`

### CRS

Due to its complexity, the CRS dataset is represented in the package using semi-aggregated combinations of variables.

#### Perspective

The first CRS-specific ID indicates the data perspective:

- `CRS.10.P.xx` for the provider's perspective
- `CRS.10.R.xx` for the recipient's perspective

#### Type of finance

Finance types are represented using the following IDs:

- `0`: Non flows
- `100`: Grants
- `420`: Debt instruments
- `430`: Mezzanine finance instruments
- `500`: Equity and shares in collective investment vehicles
- `600`: Debt relief
- `1000`: Guarantees and other unfunded contingent liabilities
- `T`: All finance types combined

For example, `CRS.10.P.420.xx`, `CRS.21.R.430.xx`, `CRS.10.P.T.xx`

#### Cooperation modality

Cooperation modalities are identified by the following IDs:

- `A`: Budget support
- `B`: Core contributions and pooled programmes and funds
- `C`: Project-type interventions
- `D`: Experts and other technical assistance
- `E`: Scholarships in donor countries
- `F`: Debt relief
- `G`: Administrative costs
- `H`: Other in-donor expenditures
- `X`: Unspecified
- `T`: All modalities combined

For example, `CRS.10.P.420.A.xx`, `CRS.21.R.430.F.xx`, `CRS.10.P.T.T.xx`

#### Purpose

The CRS includes `purpose_code` and `purpose_name` columns to capture the economic sector targeted by the aid. Examples
include:

- `110`: Education
- `120`: Health
- `130`: Population policies and programmes
- `140`: Water Supply and Sanitation
- ...
- `T`: All purposes combined

#### Policy markers

The CRS includes several policy marker columns, identified in the indicator nomenclature by the following IDs:

- `BIOD`: Biodiversity
- `CA`: Climate Adaptation
- `CM`: Climate Mitigation
- `DES`: Desertification
- `DIG`: Digitalisation
- `DRR`: Disaster Risk Reduction
- `ENV`: Environment
- `GEN`: Gender
- `RMNCH`: Reproductive, Maternal, Newborn and Child Health
- `TRD`: Trade

Each policy marker is scored by the OECD to indicate how prominently it is targeted:

- `0`: Not targeted
- `1`: Significant objective
- `2`: Principal objective

Examples of how policy markers are used in indicators:

- Gender is not targeted → `CRS.10.P.100.T.T.GEN0`
- Biodiversity is significantly targeted → `CRS.21.R.420.F.110.BIOD1`
- Climate mitigation is mainly targeted → `CRS.10.P.100.A.130.CM2`

#### Putting it all together

CRS indicators follow this format:

`CRS.[flow type].[perspective].[finance type].[modality].[purpose]`

For simplicity, trailing `T`s are dropped. For example:

- `CRS.10.P` is equivalent to `CRS.10.P.T.T.T.T`
- `CRS.10.R.430` is equivalent to `CRS.10.R.430.T.T`

### ONE 

`oda_data` also includes a series indicators derived from DAC for ONE's analysis and research:

- `ONE.10.1010_11010`: Total ODA, (official definition) — net flows before 2018, grant equivalents from 2018 onwards
- `ONE.40.1010_11010_1`: Total ODA (official definition) as a percentage of GNI
- `ONE.40.1010_1`: Total ODA (net flows) as a percentage of GNI
- `ONE.10.1010C`: Total Core ODA (ONE Definition) — ODA excluding in-donor spending
- `ONE.10.206_106`: Total ODA (bilateral plus imputed multilateral)
- `ONE.P.40.T.T.S_M`: Purpose shares (3-year rolling total) out of total ODA and OOF, for multilateral organisations.