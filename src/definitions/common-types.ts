export type TableOutput<T> = TableSuccessOutput<T> | ErrorOutput;
export type QueryOutput<T> = QuerySuccessOutput<T> | ErrorOutput;

interface TableSuccessOutput<T> extends QuerySuccessOutput<T> {
  totalCounts: number;
  totalPages: number;
}

interface QuerySuccessOutput<T> extends SuccessOutput {
  data: T;
}

interface SuccessOutput {
  ok: true;
}

interface ErrorOutput {
  ok: false;
  error: string;
}
