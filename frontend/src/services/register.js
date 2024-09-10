const API_URL = 'http://localhost:5000';

export const register = async (username,email,password,role)=>{
    try{
        console.log("Registration called",email,password);
        const response = await fetch(`${API_URL}/auth/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username,email,password,role
            })
        });
        localStorage.setItem('token',response.token);
        localStorage.getItem('email',response.user.email)
        console.log(response);
        // const data = await response.json();
        
        return await response.json();
    }catch(error){
        alert(error.message);
        throw new Error(error.message);
    }
};

// export default register;   
