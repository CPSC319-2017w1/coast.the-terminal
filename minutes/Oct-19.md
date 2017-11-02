### Were our assumptions correct?
* Yes they were.
---
### Are we hashing or encrypting the password?
* Both.
---
### Reporting
* With the tools we’re using, is there any limitations? (comparing it to excel, do we feel like we’re limited in terms of what we can do on the web?) Generating the same types of reports? Generating a line graph indicating average costs, etc.
  * We need to know the list of graphs they may want to see
  * May want to see a trend (e.g. volume is going up but the cost is going down. How would you integrate that?)
* Ability to show multiple graphs at the same time.
* Adding data labels to the bars.
* Mesh of number of people, costs, filter by roles, trends in each of these
* Visual wise it’s nice and clean and simple
---
### Feedback on UI
* Going down the right path.
---
### Would you like tutorials for different parts of the system? (apart from data filtering)
* Would be useful.
---
### “Rehire” field on contractor table
* Should not be editable on adding new contractors but it should be there when editing the contractor’s information.
---
### Would there be a challenge if there’s a lot of data being changed at once
* Yes, but we’re working on handling it.
---
### What if multiple users are adding data at once ?
* Collision testing (multiple users editing the same data at once)
* “Loser” would have to know the data they were editing was previously edited by someone and the data is outdated.
---
## ACTIONABLE ITEMS
* Look into collision testing and how to manage multiple users editing the same data at once
  * Option 1: Lock a contractor from being editable by others if it’s being edited by a user
  * Option 2: Notify user that the contractor is being edited by someone else
* Look into reports being able to handle multiple graphs at the same time (i.e. trend reports)
* Look into adding tutorials for the panels
