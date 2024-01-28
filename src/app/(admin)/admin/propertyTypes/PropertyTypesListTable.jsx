import Edit from '@/common/Edit';
import Trash from '@/common/Trash';
import { categoryListTableTHeads } from '@/constant/tableHeaders';
import { useRemovePropertyType } from '@/hooks/usePropertyTypes';
import { alertConfirm } from '@/utils/confirmAlert';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

function PropertyTypesListTable({ propertyTypes }) {
  const { mutateAsync } = useRemovePropertyType();
  const queryClient = useQueryClient();

  const removePropertyTypeHandler = async (id) => {
    const deletion = async () => {
      try {
        const { message } = await mutateAsync(id);
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ['get-propertyTypes'] });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    alertConfirm(deletion);
  };

  return (
    <div>
      <div className="shadow-sm overflow-auto">
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
            {propertyTypes.map((propertyType, index) => (
              <tr key={propertyType._id}>
                <td className="table__td">{toPersianNumbers(index + 1)}</td>
                <td className="table__td  whitespace-nowrap font-bold">
                  {propertyType.title}
                </td>
                <td className="table__td">{propertyType.englishTitle}</td>
                <td className="table__td font-bold text-lg">
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={() =>
                        removePropertyTypeHandler(propertyType._id)
                      }
                    >
                      <Trash />
                    </button>
                    <Link
                      href={`/admin/propertyTypes/edit/${propertyType._id}`}
                    >
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

export default PropertyTypesListTable;
