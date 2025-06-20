import Pagination from "@mui/material/Pagination"
import { ChangeEvent } from "react"
import styles from "./TasksPagination.module.css"
import { PAGE_SIZE } from "@/common/constants/constants.ts"

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const pageCount = Math.ceil(totalCount / PAGE_SIZE)

  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }
  return (
    <>
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={changePage}
          shape="rounded"
          color="primary"
          className={styles.pagination}
        />
      )}
      {/*<div className={styles.totalCount}>*/}
      {/*  <Typography variant="caption">Total: {totalCount}</Typography>*/}
      {/*</div>*/}
    </>
  )
}
