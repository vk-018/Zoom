import { useForm } from 'react-hook-form';

const MyFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          {...register('age', {
            required: 'Age is required',
            min: {
              value: 18,
              message: 'You must be at least 18 years old',
            },
          })}
        />
        {errors.age && <span className="error-message">{errors.age.message}</span>}
      </div>

      {/* ✅ Custom Validation Field */}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          {...register('username', {
            required: 'Username is required',
            validate: (value) => {       //this can return either a string (which will serve as error msg) or true (no error)
              if (!/^[A-Za-z]/.test(value)) {
                return 'Username must start with a letter';
              }
              if (!/^[A-Za-z0-9_]+$/.test(value)) {
                return 'Username can only contain letters, numbers, or underscores';
              }
              return true; // ✅ valid   no error msg
            },
          })}
        />
        {errors.username && (
          <span className="error-message">{errors.username.message}</span>
        )}
      </div>

      <div>
        <input
          type="checkbox"
          id="agreeTerms"
          {...register('agreeTerms', {
            required: 'You must agree to the terms and conditions',
          })}
        />
        <label htmlFor="agreeTerms">I agree to the terms and conditions</label>

        {errors.agreeTerms && (
          <span className="error-message">{errors.agreeTerms.message}</span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyFormComponent;
