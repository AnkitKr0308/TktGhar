import React from "react";

function Form({
  fields = [],
  formData,
  onChange,
  btnLabel,
  onSubmit,
  disabled,
  errors = {},

  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col">
              <label
                htmlFor={field.id}
                className="mb-3 text-gray-700 font-semibold text-left"
              >
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "date" ? (
                <input
                  id={field.id}
                  name={field.id}
                  type="date"
                  onChange={onChange}
                  readOnly={field.readOnly || false}
                  value={formData?.[field.id] ?? ""}
                  required={field.required || false}
                  className="border rounded-lg p-3 text-gray-700 shadow-sm hover:shadow-md 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 
               focus:border-indigo-500 placeholder-gray-400 transition duration-300"
                  {...props}
                />
              ) : field.type === "text-area" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  onChange={onChange}
                  readOnly={field.readOnly || false}
                  value={formData?.[field.id] ?? ""}
                  required={field.required || false}
                  className="border rounded-lg p-3 text-gray-700 shadow-sm hover:shadow-md 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 placeholder-gray-400 transition duration-300"
                  {...props}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.id}
                  name={field.id}
                  onChange={onChange}
                  value={formData?.[field.id] ?? ""}
                  required={field.required || false}
                  className="border rounded-lg p-3 text-gray-700 shadow-sm hover:shadow-md 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition duration-300"
                  {...props}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "tel" ? (
                <input
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onChange={onChange}
                  readOnly={field.readOnly || false}
                  value={formData?.[field.id] ?? ""}
                  required={field.required || false}
                  className="border rounded-lg p-3 text-gray-700 shadow-sm hover:shadow-md 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 placeholder-gray-400 transition duration-300"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please enter a valid 10-digit phone number"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  {...props}
                />
              ) : (
                <>
                  <input
                    id={field.id}
                    name={field.id}
                    type="text"
                    list={field.options ? `${field.id}-list` : undefined}
                    placeholder={field.placeholder}
                    onChange={onChange}
                    value={formData?.[field.id] ?? ""}
                    required={field.required || false}
                    className="border rounded-lg p-3 text-gray-700 shadow-sm hover:shadow-md 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 
               focus:border-indigo-500 placeholder-gray-400 transition duration-300"
                  />
                  {field.options && (
                    <datalist id={`${field.id}-list`}>
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option} />
                      ))}
                    </datalist>
                  )}
                </>
              )}
              {errors[field.id] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[field.id]}
                </span>
              )}

              {errors.general && (
                <div className="text-red-500 text-center mb-4">
                  {errors.general}
                </div>
              )}
            </div>
          ))}
        </div>
        {btnLabel && (
          <button
            type="submit"
            disabled={disabled}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {btnLabel}
          </button>
        )}
      </form>
    </div>
  );
}

export default Form;
