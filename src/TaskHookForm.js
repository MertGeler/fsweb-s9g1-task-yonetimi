import { nanoid } from "nanoid";
import React from "react";
import { useForm } from `react-hook-form`

export default function TaskHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { title: "", description: "", people: [], id: nanoid(5) },
    mode: "onChange",
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    submitFn({...data, status:"yapılacak"});
    e.target.reset();

    const validatePeople = (value) => {
      if (value.lenght >= 1 && value.lenght <=4) {
        return true;
      }
      else { 
        return "min 1 max 4 kişi seçebilirsiniz";
      }
    }
  }

  return (
    <div>
      {" "}
      <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            
            type="text"
            {...register("title"), {required: "Title alanı gerekli", minLength:{value:5, message:"En az 5 char"}}}
            
          />
          <p className="input-error">{errors.title?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            {...register("description", {minLength:{value:4, message:"En az 4 char"}, maxLenght:{value:100, message:"En fazla 100"}})}
          ></textarea>
          <p className="input-error">{errors.description?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  value={p}
                  {...register("people", {validate: validatePeople})}
                />
                {p}
              </label>
            ))}
          </div>
          <p className="input-error">{errors.people?.message}</p>
        </div>

        <div className="form-line">
          <button
            className="submit-button"
            type="submit"
            disabled={!isvalid}
          >
            Kaydet
          </button>
        </div>
      </form>{" "}
    </div>
  );
}
