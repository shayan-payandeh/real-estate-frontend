'use client';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { propertyRequestsListTableTHeads } from '@/constant/tableHeaders';
import { useRemovePropertyRequest } from '@/hooks/usePropertyRequests';
import Trash from '@/common/Trash';
import Edit from '@/common/Edit';
import View from '@/common/View';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { alertConfirm } from '@/utils/confirmAlert';
import Tooltip from '@/component/Tooltip';

function PropertyRequestsListTable({ propertyRequests, archive = false }) {
  const target = archive ? 'archive' : 'propertyRequests';
  const { page, docs, limit } = propertyRequests;
  const { mutateAsync } = useRemovePropertyRequest();
  const queryClient = useQueryClient();

  const removePropertyRequestHandler = async (id) => {
    const deletion = async () => {
      try {
        const { message } = await mutateAsync(id);
        toast.success(message);
        queryClient.invalidateQueries({
          queryKey: ['get-propertyRequests'],
        });
      } catch (error) {
        toast.error(error?.respone?.data?.message || error.message);
      }
    };
    alertConfirm(deletion);
  };
  return (
    <div className="shadow-sm overflow-auto my-10">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead className="table__header">
          <tr>
            {propertyRequestsListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
            <th className="table__th">وضعیت</th>
            {!archive && <th className="table__th">اولویت</th>}
            <th className="table__th">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((propertyRequest, index) => {
            return (
              <tr
                key={propertyRequest._id}
                className={index % 2 !== 0 ? 'bg-slate-100' : ''}
              >
                <td className="table__td">
                  {toPersianNumbers(index + 1 + (page - 1) * limit)}
                </td>
                <td className="table__td  whitespace-nowrap font-bold">
                  {propertyRequest.fullName}
                </td>
                <td className="table__td">{propertyRequest.type?.title}</td>
                <td className="table__td">{propertyRequest.category?.title}</td>
                <td className="table__td">
                  {toPersianNumbers(propertyRequest.meter)}
                </td>
                <td className="table__td">
                  {propertyRequest.isChecked ? (
                    <span>بررسی شده</span>
                  ) : (
                    <span className="font-bold">جدید</span>
                  )}
                </td>
                {!archive && (
                  <td className="table__td">
                    {propertyRequest.priority === 4
                      ? toPersianNumbers(propertyRequest.priority) +
                        ' ' +
                        '(عمومی)'
                      : toPersianNumbers(propertyRequest.priority)}
                  </td>
                )}

                <td className="table__td font-bold text-lg">
                  <div className="flex items-center gap-x-4">
                    <Link href={`/admin/${target}/${propertyRequest._id}`}>
                      <View />
                    </Link>
                    <Link href={`/admin/${target}/edit/${propertyRequest._id}`}>
                      <Edit />
                    </Link>

                    <button
                      onClick={() =>
                        removePropertyRequestHandler(propertyRequest._id)
                      }
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default PropertyRequestsListTable;
