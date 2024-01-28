import Edit from '@/common/Edit';
import Trash from '@/common/Trash';
import { categoryListTableTHeads } from '@/constant/tableHeaders';
import { alertConfirm } from '@/utils/confirmAlert';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { useRemoveLocation } from '@/hooks/useLocations';

function LocationListTable({ locations }) {
  const { mutateAsync } = useRemoveLocation();
  const queryClient = useQueryClient();

  const removeLocationHandler = async (id) => {
    const deletion = async () => {
      try {
        const { message } = await mutateAsync(id);
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ['get-locations'] });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    alertConfirm(deletion);
  };

  return (
    <div>
      <div className="shadow-sm overflow-auto my-8">
        <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
          <thead className="table__header">
            <tr>
              {categoryListTableTHeads.map((item) => (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              ))}
              <th className="table__th"></th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={location._id}>
                <td className="table__td">{toPersianNumbers(index + 1)}</td>
                <td className="table__td  whitespace-nowrap font-bold">
                  {location.title}
                </td>
                <td className="table__td">{location.englishTitle}</td>
                <td className="table__td font-bold text-lg">
                  <div className="flex items-center gap-x-4">
                    <button onClick={() => removeLocationHandler(location._id)}>
                      <Trash />
                    </button>
                    <Link href={`/admin/locations/edit/${location._id}`}>
                      <Edit />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LocationListTable;
