import Tooltip from '@/component/Tooltip';
import { HiTrash } from 'react-icons/hi';

function Trash() {
  return (
    <Tooltip content="حذف">
      <span>
        <HiTrash className="icon icon__delete" />
      </span>
    </Tooltip>
  );
}

export default Trash;
