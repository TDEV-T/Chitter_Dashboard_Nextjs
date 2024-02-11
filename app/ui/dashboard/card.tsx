import {
  CommentOutlined,
  FileOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";

const iconMap = {
  user_count: UserOutlined,
  post_count: FileOutlined,
  like_count: LikeOutlined,
  comment_count: CommentOutlined,
};

export default async function CardWraper() {
  return (
    <>
      <Card title="User in System" value={20} type="user_count" />
      <Card title="Post in System" value={30} type="post_count" />
      <Card title="Like in System" value={40} type="like_count" />
      <Card title="Comment in System" value={40} type="comment_count" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "user_count" | "post_count" | "like_count" | "comment_count";
}) {
  const Icon = iconMap[type];
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-gray-700">
      <div className="flex p-4">
        <Icon className="h-5 w-5 text-gray-700 dark:text-white" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white dark:bg-gray-600 dark:text-white text-black px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
