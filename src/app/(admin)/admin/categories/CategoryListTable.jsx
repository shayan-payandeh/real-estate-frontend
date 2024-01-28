import Edit from '@/common/Edit';
import Trash from '@/common/Trash';
import { categoryListTableTHeads } from '@/constant/tableHeaders';
import { useRemoveCategory } from '@/hooks/useCategories';
import { alertConfirm } from '@/utils/confirmAlert';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toPersianNumbers } from '@/utils/toPersianNumbers';

function CategoryListTable({ categories }) {
  const { mutateAsync } = useRemoveCategory();
  const queryClient = useQueryClient();

  const removeCategoryHandler = async (id) => {
    const deletion = async () => {
      try {
        const { message } = await mutateAsync(id);
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ['get-categories'] });
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
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td className="table__td">{toPersianNumbers(index + 1)}</td>
                <td className="table__td  whitespace-nowrap font-bold">
                  {category.title}
                </td>
                <td className="table__td">{category.englishTitle}</td>
                <td className="table__td font-bold text-lg">
                  <div className="flex items-center gap-x-4">
                    <button onClick={() => removeCategoryHandler(category._id)}>
                      <Trash />
                    </button>
                    <Link href={`/admin/categories/edit/${category._id}`}>
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

export default CategoryListTable;
