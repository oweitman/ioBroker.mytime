# Older changes
## 2.2.1 (2025-12-01)

- add missing files

## 2.2.0 (2025-12-01)

- add calculation of astro dates to timeseries
- rework of the timeseries caluclation in the backend
- this version includes extended debug information (map-files).
  For this reason, the adapter is approximately 13MB in size instead of 2MB.

## 2.1.0 (2025-11-27)

- switch from crao to vite build system
- New option for countdown timer: rerun - when the timer expires,
  it will automatically restart.

## 2.0.1 (2025-09-08)

- major release: make nixie clock responsive. the users have to adjust the
  font-size of the widget to get the old size.
  if you want the old size try it with 100px font-size.

## 1.4.7 (2025-07-25)

- remove types/request
- improve documentation format

## 1.4.6 (2025-07-21)

- fix wrong calc of datapoints in some cases

## 1.4.5 (2025-07-21)

- fix widget reverse countdown plain

## 1.4.4 (2025-06-16)

- fix stopbeaviour
- fix state handling
- improve validator vor name and setdp in admin

## 1.4.3 (2025-06-06)

- fix validation rule for the setDP button in admin

## 1.4.2 (2025-06-01)

- revert to node 18
- cleanup files and some details
- fix server time diff calculations

## 1.4.0 (2025-01-02)

- to update the time from the configuration i added a SetDP Button

## 1.3.0 (2025-01-02)

- switch to iobroker eslint
- adjust many code to follow the new rules
- add some jsdoc
- implement servertimediff calculation and correction
- fix datapoint names for the vis1 example controls
- set nogit
- adjust year in readme and license

## 1.2.2 (2024-11-18)

- improve readme
- improve widget js
- remove word test from widgets html, sorry

## 1.2.1 (2024-11-17)

- interprete all commands in lowercase

## 1.2.0 (2024-11-15)

- widgets are now compatible with vis2

## 1.1.1 (2024-11-13)

- fix problem with start of vis2, exclude widgets for vis2

## 1.1.0 (2024-11-12)

- IMPORTANT: Changed Datapoint names and datastructure for the configuration,
  no migration you have to enter all configurations again
- add some new commands to restart the countdown time in place
- repair save command
- removed vis dependency from io-package.json

## 1.0.15 (2024-11-11)

- repair issues from repochecker

## 1.0.14 (2024-11-11)

- improve test and release process
- update github workflow
- remove eslint command from package.json
- switch back to node 18 for testing due to airbnb error
- more repair
- add package-lock.json to git
- remove unused library
- add lint and lint
- remove iobroker eslint
- general revision
- updating the configuration dialogs for countdown and timeseries
  in jsonConfig and custom react

## 0.7.12

- add html_prepend and html_append properties to the widget reverse countdown

## 0.7.10

- add widget reverse countdown

## 0.7.9

- add more wordclock tests
- fix wordclock matrix swiss

## 0.7.8

- add timezone for wordclock

## 0.7.7

- add timezone for wordclock

## 0.7.6

- add tests for wordclock \* remove admin tab

## 0.7.5

- Remove comments in io-package

## 0.7.4

- fix spanish language pack

## 0.7.3

- add turkish language for wordclock

## 0.7.2

- add russian and espaniol language for wordclock

## 0.7.1

- add margin property for wordclock
- add italiano and francais for wordclock
- wordclock remove border

## 0.7.0

- New widget wordclock

## 0.6.1

- remove beta tag from widgets \* m,assive reengeneering of the react classes,
  add functions für exclusion rules, adding single time events
  and exclude single time events

## 0.6.0

- Introduction of new functionality timeseries

## 0.5.2

- fix an issue and introduce a new command save to save the configuration
  defined in datapoints to the iobroker configuration data

## 0.5.1

- Migration of old counters

## 0.5.0

- Change settings dialog to react

## 0.4.2

- performance optimization. mytime now checks the data from internal
  and did not read the data allways from datapoints | update dependencies

## 0.4.1

- widget cd flipclock: remove dot labels

## 0.4.0

- New widget NixieClock

## 0.3.1

- remove mytime tile in iobroker overview
- set initial visual countdown value to 0
- prefix css classes, due css artefacts from other adapters
  (eg kodi and css class stop)

## 0.3.0

- new command to set only target time without date
- countdown circle widget now with option to disable countdown text
- timers are now groupable in subdirectories.
  you can now enter dots (.) as a groupseperater in the name of a timer

## 0.2.1

- fix timer display in configuration dialog
- fix default template of countdown plain
- add icons for countdonw plain and countdown circle widgets
- fix startangle calculation for countdown circle if time values are 0
- remove timer intervals in editmode due to interfer with
  the configuration dialog and didnt save the ne values

## 0.2.0

- extend the countdown circle with more rings for days, hours and minutes

## 0.1.2

- Setting for growing or shrinking the ring/circle
- Setting for the ends of the ring/circle: round or straight
- Extend special char filtering with umlauts
- Fix state request issue in widget countdown circle

## 0.1.1

- Add a countdown name datapoint

## 0.1.0

- Forum release
- initial release
