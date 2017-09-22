<table>
	<tr>
  	<th>Question</th>
    <th>Answer</th>
  </tr>
  <tr>
  	<td>What are your likes/dislikes of the current system?</td>
    <td>
      [Kevin]
      Goods: It’s simple to work with.
      Bads: Takes long to update, and everything else. A lot of manual work, copy pasting, adding rows. It will be nice if there’s a form doing calculations in the background helping with filling out new contractor information. Having drop downs from other tables and default values filled in would be helpful. Some fields should be required. Adding contractors -> sometimes it’s good to be able to add a few at the same time and sometimes it’s better to be able to only add one contractor at a time. (e.g. if a contractor is working for multiple projects or multiple contractors working for one project. UI will be simple and auto-filled but in the database the data will be duplicated across multiple rows.)
      <hr />
      [Anushka]
      As a new person looking at it, it is difficult to use and figure out, and it’s not intuitive.
      [shows paper UI]
      Assuming table to select filters is first. Choose fields on the left and automatically fill out the fields on the right based on the selection - more intuitive and easier.
      <hr />
      [Kevin]
      If people are not familiar with pivot tables then using the tables will be hard for them in the first place - more simplicity will help with that.
    </td>
  </tr>
  <tr>
  	<td>What would you want to see as a landing page?</td>
    <td>
      Have not thought about it yet, have only been thinking about what they actually need.
      Form to start adding things, informational forms, etc.
    </td>
  </tr>
  <tr>
  	<td>Importing data into the system from the old system (bulk import)</td>
    <td>
      Very close to the sample data - some fields have been excluded, but the format is pretty much the same.
      The data is in xml format and a sample of the real data could be given for us to try and import so that no more manual data will have to be added in.
    </td>
  </tr>
  <tr>
  	<td>Should the data be deletable?</td>
    <td>
      Data will be editable but it will not be deletable.
      In the reports we want active people to always be included but inactive people even though they may not be represented they should still be there for future reference.
    </td>
  </tr>
  <tr>
  	<td>Reference numbers?</td>
    <td>
      Multiple filters would be the same usefulness as a reference number - filtering down the list of projects that way will be good enough without a reference number.
    </td>
  </tr>
  <tr>
  	<td>Who else is using the system?</td>
    <td>
      Just one person, and it will be nice to not have to keep updating it by himself and other people in the company being able to generate needed reports based on the data.
    </td>
  </tr>
  <tr>
  	<td>Admin vs. Employee roles - what is expected?</td>
    <td>
      Several admins - admin users are responsible for configuration users, project codes, things like that.
      Actual users of the system - a director level person looking at a whole area, looking at multiple centers, across multiple projects, etc.
      Another user type which will be only able to access one area/project/coast center at a time.
      User will be able to add data if given permissions.
      <hr />
      [Kevin]
      Admin -  manages tables that feed everything else (e.g. managers, pay grades, etc)
      User - adding and editing contractor data
      We should generate sample data to test this user role functionality.
    </td>
  </tr>
  <tr>
  	<td>Specific graph functionalities to be added?</td>
    <td>
      We will be adding basic graph functionalities
      <hr />
      [Kevin]
      “From this day forward” view in the graphs
	  </td>
  </tr>
  <tr>
  	<td>What do “time and material terms” entail?</td>
    <td>No answer yet. Could be some sort of contractual thing.</td>
  </tr>
  <tr>
  	<td>
      FX Table for Exchange
        - Any other currencies?
        - How often should it be updated?
    </td>
    <td>
      Just CAD and USD. Since currencies don’t fluctuate that much, it should update periodically.
      Automatic updates are not in scope but is a nice feature.
    </td>
  </tr>
  <tr>
  	<td>Is reporting and hiring manager the same? If different, is hiring manager associated with a contract or a contractor?</td>
    <td>
      90% of the time it is but there are times that are not.
      There should be enough flexibility to add possibly different managers at different points in time.
    </td>
  </tr>
  <tr>
  	<td>What type of override ability will Desk Location need? What kind of data are we expecting for this field?</td>
    <td>
      The idea of desk location is to know about the capacity of the locations and nothing more. Since people move around it needs to be flexible. This is very minor compared to everything else.
    </td>
  </tr>
  <tr>
  	<td>What if a contractor is working at a cost centre and he switches to another cost centre do you want to view his history?</td>
    <td>Yes.</td>
  </tr>
  <tr>
  	<td>For the pay equivalent table, do we get sample data for PayGrade and corresponding compensation?</td>
    <td>A letter and a number. It is for layering in future HR data.</td>
  </tr>
  <tr>
  	<td>Is this compensation supposed to be the same as the rate highlighted in the Engagement Contract?</td>
    <td>
      The numbers may be different. Need to be able to be updated when HR changes their data.
      Pay grade value is given in ranges and is pulled from a table and compared against an HR equivalent table.
      We will need dummy data for that.
    </td>
  </tr>
  <tr>
  	<td>Expiry report and Aging report?</td>
    <td>
      Large volume of contractors and comparing them against the end date.
      Similar idea with the aging report. There are clauses (like termination within a time limit)
    </td>
  </tr>
  <tr>
  	<td>More thing about stretch goals?</td>
    <td>End of year numbers will have to always be compared against the budget and the costs of contractors.</td>
  </tr>
  <tr>
  	<td>Cost estimation - any specific servers?</td>
    <td>
      Anything we want. AWS is useful. From last year some of the groups got into it too late it was too hard to figure out at that point.
      For them as long as we provide them a working link they’re happy.
    </td>
  </tr>
  <tr>
  	<td>Open source? Publicly viewed?</td>
    <td>No reason why not as long as we don’t expose sensitive data.</td>
  </tr>
</table>
