export default function Requirement(props: React.ComponentPropsWithoutRef<'div'> & {
  question: string;
}){
    return (
      <div>
          <div className="rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">{props.question}</div>
            </div>
          </div>
      </div>
    )
}