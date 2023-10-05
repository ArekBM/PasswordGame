export default function Requirement(props: React.ComponentPropsWithoutRef<'div'> & {
  question: string;
  red?: boolean;
  green?: boolean;
}){
    return (
      <div>
          <div className="rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            {props.red === true && <div className="mb-8">
              <div className="text-red-900 font-bold text-xl mb-2">{props.question}</div>
            </div>}
            {props.red === false && <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">{props.question}</div>
            </div>}
            {props.green === true && <div className="mb-8">
              <div className="text-green-600 font-bold text-xl mb-2">{props.question}</div>
            </div>}
          </div>
      </div>
    )
}