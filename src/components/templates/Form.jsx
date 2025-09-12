import React from "react";

function Form({ fields = [], formData, onChange, ...props }) {
  return (
    <div>
      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col">
              <label
                htmlFor={field.id}
                className="mb-3 text-gray-700 font-semibold text-left"
              >
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "text-area" ? (
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
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
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
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
