interface props {
  totalPage: number;
  currentPage: number;
  next: any;
  previous: any;
}
export const Pagination: React.FC<props> = ({
  totalPage,
  currentPage,
  next,
  previous,
}) => {
  return (
    <>
      <div className='flex mt-4 flex-row justify-between items-center gap-2'>
        <div>
          {currentPage !== 1 && (
            <button
              onClick={previous}
              className='bg-blue-500 hover:bg-slate-500 transition ease-in-out duration-150 px-4 py-1 text-white rounded-md'
            >
              next
            </button>
          )}
        </div>
        <div>
          <span>
            page <span className='font-bold'>{currentPage}</span> of{" "}
            <span className='font-bold'>{totalPage}</span>
          </span>
        </div>
        <div>
          {currentPage !== totalPage && (
            <button
              onClick={next}
              className='bg-blue-500 hover:bg-slate-500 transition ease-in-out duration-150 px-4 py-1 text-white rounded-md'
            >
              next
            </button>
          )}
        </div>
      </div>
    </>
  );
};
