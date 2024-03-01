# Tweeter Project

Tweeter is a simple, single-page Twitter clone that utilizes jQuery, HTML5, and CSS3 to allow the user to compose, call, and view tweets. 

## Features
- Compose Tweet: Users can compose tweets using a text input field and submit them to be displayed in reverse-chronological order on the timeline. Tweets are sanitized to ensure no malicious text is allowed.
- Character Limit: Tweets are limited to a certain number of characters to mimic the character limit on Twitter. If invalid (too short or long) an appropriate error message wll display via animation.
- Compose Button: A button to compose tweets is housed within the navigation bar; when clicked it displays the form that new tweets are composed with.
- Responsive Design: The page is designed to be responsive via layout shifter, creating a seamless user experience across various devices and screen sizes. The breakpoint has been set for 1024px.


## Dependencies

- Express
- Node 5.10.x or above
- body-parser 
- Chance
- Express
- Md5
- Nodemon