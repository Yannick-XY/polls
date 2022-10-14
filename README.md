# Polls - an app, similar to doodle or dudle, for Nextcloud written in PHP and JS/Vue.
![psalm](https://github.com/nextcloud/polls/actions/workflows/static-analysis.yml/badge.svg)
![tests](https://github.com/nextcloud/polls/actions/workflows/phpunit.yml/badge.svg)
![puild](https://github.com/nextcloud/polls/actions/workflows/nodejs.yml/badge.svg)
![lint](https://github.com/nextcloud/polls/actions/workflows/lint.yml/badge.svg)
[![Dependabot status](https://img.shields.io/badge/Dependabot-enabled-brightgreen.svg?longCache=true&style=flat-square&logo=dependabot)](https://dependabot.com)
[![Software License](https://img.shields.io/badge/license-AGPL-brightgreen.svg?style=flat-square)](COPYING)

# Free meeting schedule tool

- :next_track_button: Easy poll creation
- :hammer_and_wrench: Highly customizable
    - :envelope: Make your poll confidential by hiding the results until you want them to be discovered
    - :dark_sunglasses: Obfuscate participants' names from other participants
    - :timer_clock: Set an automatic expiry date
    - :heavy_plus_sign: Allow participants to add more options
    - :white_check_mark: Limit votes per option or user
    - ... :currency_exchange: and a lot more
- :mailbox_with_mail: Invite everyone you want
- :rocket: Export your poll to different spreadsheet formats or HTML
- :red_envelope: Let Polls automatically remind your invited users
- :speech_balloon: Comments
- :ballot_box_with_check: Confirm options after poll closing
- :loudspeaker: Subscribe to notifications per poll
- :date: Get hints about possible conflicting entries in your calendar around the date option
- :toolbox: Usable via REST-API
- Supports the following nextcloud apps
    - Circles
    - Collections aka projects
    - Contacts
    - Activity

## Installation / Update
This app is supposed to work on Nextcloud version 21+.

### Install latest release
You can download and install the latest release from the [Nextcloud app store](https://apps.nextcloud.com/apps/polls).

## Support
- Report a bug or request a feature:  https://github.com/nextcloud/polls/issues
- Community support: https://help.nextcloud.com/c/apps/polls/

## Screenshots
#### Manage your polls and create new ones
![Manage Polls](screenshots/overview.png)

#### Many configuration options
![Vote](screenshots/edit-poll.png)

#### Share your poll with other people
![Edit poll](screenshots/share.png)

#### Vote on mobile
![Share poll](screenshots/vote.png)

### Install from git
If you want to run the latest development version from git source, you need to clone the repo to your apps folder:

```
git clone https://github.com/nextcloud/polls.git
```

* Install dev environment with ```make dev-setup```
* Compile javascript with ```npm run build```
* Run a complete build with ```make appstore``` (Find the output in the build directory)

## Contribution Guidelines
Please read the [Code of Conduct](https://nextcloud.com/community/code-of-conduct/). This document offers some guidance to ensure Nextcloud participants can cooperate effectively in a positive and inspiring atmosphere, and to explain how together we can strengthen and support each other.

For more information please review the [guidelines for contributing](https://github.com/nextcloud/server/blob/master/.github/CONTRIBUTING.md) to this repository.
