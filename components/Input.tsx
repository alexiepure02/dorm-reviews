import { IconType } from "react-icons";

interface InputProps {
  classNameInput?: string;
  classNameDiv?: string;
  Icon: IconType;
  id: string;
  type: string;
  placeholder: string;
  rules?: object;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({
  classNameInput,
  classNameDiv,
  Icon,
  id,
  type,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div className={"relative " + classNameDiv}>
      <Icon className="absolute top-1/2 translate-y-[-50%] left-4 text-primary-100" />
      <input
        className={
          "w-full h-[54px] pl-10 px-4 rounded-md border-2 border-primary-800 focus:border-primary-100 outline-none shadow" +
          classNameInput
        }
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
