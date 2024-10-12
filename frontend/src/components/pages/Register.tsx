import {useForm} from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    }
const Register = () =>{
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterFormData>();


    const mutation = useMutation(apiClient.register,{
        onSuccess: (data) => {
            // I will fire second!
            console.log(data);
          },
          onError: (error) => {
            // I will fire second!
            console.log(error)
          },
    })
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data);
    })
    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName", { required: "this field is required" })}/>
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName", { required: true })}/>
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </label>
            </div>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input type = "email" className="border rounded w-full py-1 px-2 font-normal" {...register("email", { required: true })}/>
                    {errors.email && <span>{errors.email.message}</span>}
                </label>  
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("password", { required: true , minLength:8 , maxLength:20})}/>
                    {errors.password && <span>{errors.password.message}</span>}
                </label> 
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword", { validate:(value)=>{
                        if (!value){
                            return "this field is required"
                        }else if(watch("password")!=value){
                            return "password does not match"
                        }
                    }})}/>
                    {errors.confirmPassword && (<span className="text-red-500">{errors.confirmPassword.message}</span>)}
                </label> 
                <span>
                    <button type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                    >
                    Create Account
                    </button> 
                </span>
        </form>
    )
}

 export default Register;