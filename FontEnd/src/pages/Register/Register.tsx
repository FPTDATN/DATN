import { useSignupMutation } from '@/api/auth'
import {useForm} from 'react-hook-form'
import Swal from 'sweetalert2';
const Register = () => {
    const {register, handleSubmit,formState:{errors},getValues } = useForm()
    const [signup] = useSignupMutation()


    const validateConfirmPassword = (value: any) => {
        const password = getValues('password');
        return !value || password === value;
      };
    
      const sigup = (data: any) => {
        signup(data)
          .then(() => {
            Swal.fire({
              position: 'center',
              title: 'Đăng kí thành công',
              text: 'Bạn đã đăng kí thành công!',
              icon: 'success',
              confirmButtonText: 'OK',
              iconHtml: '<i class="fas fa-check-circle"></i>'
            });
          })
      }
    return (
        <div>
            <section className="sigup">
                <div className="container ">
                    <div>
                        <div className="container w-full  lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <h2 className=" text-center text-2xl font-bold text-gray-900 dark:text-white">
                                Đăng Ký
                            </h2>
                            <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit(sigup)}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" 
                                     {...register('name',{required:true})} />
                                </div>
                                {errors.name && errors.name.type === 'required' && <p className='text-red-500'>name không được bỏ trống</p>}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" 
                                     {...register('email',{required:true,})} />
                                </div>
                                {errors.email && errors.email.type === 'required' && <p className='text-red-500'>email không được bỏ trống</p>}
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    {...register('password',{required:true})} />
                                </div>
                                {errors.password && errors.password.type === 'required' && <p className='text-red-500'>password không được bỏ trống</p>}
                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                                    <input type="password" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    {...register('confirmPassword',{required:true,validate: validateConfirmPassword})}/>
                                </div>
                                {errors.confirmPassword && errors.confirmPassword.type === 'required' && <p className='text-red-500'>confirmPassword không được bỏ trống</p>}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"  />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="font-medium text-gray-500 dark:text-gray-400">Ghi nhớ</label>
                                    </div>

                                </div>
                                <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng ký </button>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    Đã có tài khoản? <a href="login" className="text-blue-600 hover:underline dark:text-blue-500">đăng nhập tại đây</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register
