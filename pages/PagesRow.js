import Link from 'next/link';

const PagesRow = props => (
  <span>
      <Link href={`/pages/${props.id}`} >
        <a className="btn btn-outline-dark ml-2 mb-2">
        {props.title}
        </a>
      </Link>        
  </span>
);
export default PagesRow;
