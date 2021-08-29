const Info = (props) => (
    <div>
      <h1>Info</h1>
      <p>The info is: {props.info}</p>
    </div>
  )
  
  const requireAuthentication = (WrappedComponent) => {
    return (props) => (
      <div>
        {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>You are not authenticated</p>}
      </div>
    )
  }
  
  const AuthInfo = requireAuthentication(Info);
  
  function App() {
    return (
      <AuthInfo isAuthenticated={true} info="There are the details" />
    );
  }
  
  export default App;
  