import Tooltip from '@/component/Tooltip';
import { RiEdit2Line } from 'react-icons/ri';

function Edit() {
  return (
    <Tooltip content="ویرایش">
      <span>
        <RiEdit2Line className="icon icon__edit" />
      </span>
    </Tooltip>
  );
}

export default Edit;
