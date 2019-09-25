Millennial Data Dashboard
In 2013, students of the Statistics class at FSEV UK were asked to invite their friends to participate in this survey.
The dataset accrued over 1000 participants and captured the fears, hobbies, and habits of a generation of young people.
The original questionnaire was in Slovak language and was later translated into English.
All participants were of Slovakian nationality, aged between 15-30.

UX
This project was designed for anyone with an interest in the psychology of young people.
To achieve this, most data is displayed graphically, to better illustrate the findings of the survey.

As a user type, I want to perform an action, so that I can achieve a goal.
As a music producer, I want to learn more about young people's music preferences, to better cater to their tastes.
As a movie studio, I want to learn more about young people's viewing habits, so I can generate more content that will appeal to them.
As an ad agency, I want to learn more about young people's interests, so that I can design campaigns that will resonate with them.
As a health policy-maker, I want to learn more about young people's habits, to identify those most at risk of health issues.
>--- User Story 3 ---<

>--- Insert Wireframes Here ---<

Existing Features
navbar
static demographics side bar
interactive infographics for music interests
landing page - about/ demographics
movie page with interactive charts
interests page with interactive charts
fears page with interactive charts
health page with interactive charts

Features Left to Implement
Scaling for smaller devices
set decimal places to 0
"badge" styling
correlation-checker


Technologies Used
HTML
CSS
JavaScript
Bootstrap
D3
Crossfilter
DC

Testing
Resolved Issues:
Navbar not collapsing/expanding on smaller resolutions
    Added the following scripts to support transitions:
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    Landing graphs no longer overlap on smaller resolutions; 

Known Bugs:
Navbar re-aligning when navbar is expanded
Navbar will not collapse at "m" resolutions
home page elements do not resize appropriately when jumping between resolutions

Deployment
This project is deployed using github pages at the following url:
https://brendanmolloy.github.io/milestone2/

Credits
Miroslav Sabo, owner of the Young People Survey Data.
