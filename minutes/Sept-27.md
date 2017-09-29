# Agenda

* Discuss things that need to go into Requirements Doc
    * Mock-up of UI screen
    * RTM. We probably need to write the Use-cases for this.
        * We probably also need to figure out our test cases for this.
    * It shouldn't include Technical Requirements
    * We should focus only on Business, Functional and Non-Functional Requirements and other things outlined in the slides.
    * Am I missing anything in terms of Requirement Doc?

* Design doc is due next Thursday. Lets get a headstart on it.
    * Maia + Shrey can update on the status of UML diagram(s).
        * UML Class/Object diagram
        * UML System Flow diagram. This should probably be in Requirements Doc as well
    * Stephen and I should finalize the ER diagram and have that ready for the design doc.
    * Anushka should tell us what should be in the design from UI/UX pov
    * Figure out what else should be in the design doc?

* Decide which is the first feature we want to implement and we should work towards that.
    * Regardless of the feature, Stephen and I should configure the database but maybe expose only the stuff required for that particular feature for the time being.
    * Shrey to check about the scalability of visualization packages so that we can decide which one we are going forward with.

# Minutes

<table>
	<tr>
  	<th>TOPIC</th>
    <th>DISCUSSION</th>
  </tr>
  <tr>
  	<td>Requirements Doc</td>
    <td>
      <p>Initially we were going to include the technical requirements but that should go in the design doc instead.</p>
      <p>We need functional and non-functional business requirements.</p>
      <p>Other than that we will have to do the RTM spreadsheet. </p>
      <p>RTM and business diagram are not the same. RTM references the use cases but is not a diagram on use cases themselves. It can reference the use cases but not actually outline every single one. It should trace the use cases to the MVP.</p>
      <p>We can make the use case diagram first and then from there do the RTM since the RTM references the use cases.</p>
      <p>The test status document is a live diagram so we can just leave it as TBA for now.</p>
      <p>It’d be good to have 3 to 5 use cases for reference.</p>
      <p>The versions in the document are there because the doc is live and each update is versioned. </p>
      <p>We should also include some UI mocks. It does not necessarily have to be the paper mocks. We need the pivot table (the renamed pivot table - proposed name: data filter table), the search/filter functionality, and the login screen. Adding/editing contractors page should also be there. Something to consider: having the ability to add multiple contractors on the same project or multiple projects for the same contractor. However, for now, we should have only the ability to add one contractor at a time, and make it more complex later on. </p>
      <p>Anushka emailed iRise for license which was refused.</p>
      <p>UI, use cases, and system flow are the diagrams that should be in the document.</p>
      <p>UI mocks could potentially be in the appendix - or it could go under functions.</p>
      <p>Use cases could potentially be in appendix - or it could go under references.</p>
    </td>
  </tr>
  <tr>
  	<td>Design Doc</td>
    <td>
      <p>UML diagram</p>
      <p>System flow diagram (includes the data flow)</p>
      <p>Use case diagrams - should ask the TA about it</p>
      <p>ER diagram</p>
      <p>More details about the UI - a more thorough prototype</p>
      <p>REST APIs needed by the front from back</p>
      <p>Deployment potentially on AWS</p>
    </td>
  </tr>
  <tr>
  	<td>First Feature To Be Implemented</td>
    <td>
      <p>Should have the environment setup</p>
      <p>Should have a script that we can run that will start up both back and front</p>
      <p>Should start implementing the login page, or adding a contractor. Reporting should be later on since we will need more stuff in place before we can actually get started on it.</p>
      <p>For the featured colours (colour scheme), we could look at their logo. </p>
      <p>All the data being communicated will have to be encrypted - especially passwords and usernames.</p>
    </td>
  </tr>
  <tr>
  	<td>For Tomorrow’s Class</td>
    <td>
      <p>Ask our TA about our lost mark</p>
      <p>Give a report on the implementation</p>
      <p>Give a report on the diagrams</p>
      <ul>
        <li>ER diagram</li>
        <li>Screen mocks</li>
        <li>UML and system flow</li>
      </ul>
      <p>What to include or not include in the document</p>
    </td>
  </tr>
</table>
