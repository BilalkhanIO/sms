
const UnauthorizedPage = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg">You do not have permission to view this page.</p>
        <a href="/" className="mt-4 text-blue-500 underline">Go back to the home page</a>
      </div>
    );
  };
  
  export default UnauthorizedPage;
  