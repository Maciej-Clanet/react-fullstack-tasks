import "./Instructions.css";

export default function Instructions() {
  return <>
    <h1>Info</h1>
    <p>This project will help us avoid making a new react repo for every tiny app we will make</p>
    <p>Consider each task page to be it's own app. To add more task pages:</p>
    <ol>
        <li>Create a new component in pages folder</li>
        <li>Go to the App.jsx</li>
        <li>import the new page component</li>
        <li>Add it and it's name to the pages object at the top of the file</li>
    </ol>
    <p>Once you do that, the routing and nav buttons will auto generate from the object</p>
  </>;
}
