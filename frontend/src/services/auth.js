const API_URL = 'http://localhost:5000'
 const login = async (email,password)=>{
    try{
        console.log("Login called ",email,password);
        const response = await fetch(`${API_URL}/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                email,password
            }), 
        });
        const data = await response.json();
        console.log("DATA",data);
        if (!data.ok) {
            throw new Error('Login failed');
        }
        console.log(data.token);
        alert("Logged in successfully");
        return await data;
    }catch(error){
        alert(error.message);
        throw new Error(error.message);
    }
};

export default login;   
