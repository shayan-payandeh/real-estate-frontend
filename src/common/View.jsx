import Tooltip from '@/component/Tooltip';
import { HiEye } from 'react-icons/hi';

function View() {
  return (
    <Tooltip content="مشاهده">
      <span>
        <HiEye className="icon icon__view" />
      </span>
    </Tooltip>
  );
}

export default View;
