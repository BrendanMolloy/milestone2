# Millennial Data Dashboard #

In 2013, students of the Statistics class at FSEV UK were asked to invite their friends to participate in this survey.
The dataset accrued over 1000 participants and captured the fears, hobbies, and habits of a generation of young people.
The original questionnaire was in Slovak language and was later translated into English.
All participants were of Slovakian nationality, aged between 15-30.

---
## UX

This project was designed for anyone with an interest in the psychology of young people.
To achieve this, most data is displayed graphically, to better illustrate the findings of the survey.

### User Stories

As a music producer, I want to learn more about young people's music preferences, to better cater to their tastes.

As a movie studio, I want to learn more about young people's viewing habits, so I can generate more content that will appeal to them.

As an ad agency, I want to learn more about young people's interests, so that I can design campaigns that will resonate with them.

As a researcher, I want to learn more about young people's fears, so that I can examine a well-rounded picture of young people's motivations/aversions.

As a health policy-maker, I want to learn more about young people's habits, to identify those most at risk of health issues.

### Wireframes
![First Wireframe](/images/Wireframe 1.PNG)
 My initial concept was to create an array of bar graphs that represented the 
 distribution of scores for each associated category. The side bar was an idea I
 had to add a bit more interactivity to the filters, while still keeping them 
 separate from the rest of the graphs. They would rmain fixed to one side, so they
 were visible at all times, allowing you to see which filters were presently active.

![Second Wireframe](/images/Wireframe 2.PNG)
I showed my first wireframe to a friend, and they raised concerns that the dashboard 
looked a bit busy, and instead of squashing a 3x3 grid of graphs onto a page, I 
could instead try a 2x2 grid to allow the data to breathe a little and prevent users 
from becoming overwhelmed.

![Third Wireframe](/images/Wireframe 3.PNG)
The side nav worked great on a desktop resolution, but caused major scaling problem 
on smaller devices. I had planned to commit one-thrid of the screen to the side nav,
but this was still causing serious layout issues, and so far the sake of reactivity,
I redesigned the layout to something closer to the final product, with the interactive 
filters instead relegated to dropdowns near the top of the page.

![Landing Wireframe](/images/Wireframe 2.PNG)
Not wanting to completely bin the ideas from my sidenav, I recycled some of the 
code to create an interesting home page, that allowed users to play around with 
the data before looking at more specific categories.


---
## Existing Features

* navbar
* static demographics side bar
* interactive infographics for music interests
* landing page - about/ demographics
* movie page with interactive charts
* interests page with interactive charts
* fears page with interactive charts
* health page with interactive charts
* Scaling for smaller devices
* "badge" styling

### Potential Additional Features
* correlation-builder
* filters in fixed footer bar

## Technologies Used
* HTML
* CSS
* JavaScript
* Bootstrap
* D3
* Crossfilter
* DC

## Testing
### Resolved Issues:
* Navbar not collapsing/expanding on smaller resolutions
    Added the following scripts to support transitions:
    "<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
* Landing graphs no longer overlap on smaller resolutions; 
* Navbar now collapses at "m" resolutions, which are actually "md" resolutions

### Known Bugs:
* Navbar re-aligning when navbar is expanded
* home page elements do not resize appropriately when jumping between resolutions

HTML validated at: https://validator.w3.org/

CSS validated at: https://jigsaw.w3.org/css-validator/

## Deployment
This project is deployed using github pages at the following url:
https://brendanmolloy.github.io/milestone2/

## Credits
Miroslav Sabo, owner of the Young People Survey Data.

Aaron Sinnott, my mentor at Code Institute for advice

Josh Molloy, my brother, for providing an additional pair of eyes
