"use client";
import { getPostsData } from "@/app/service/data";
import { Button, Carousel, Image, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { PostModel } from "@/app/models/postmodel";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [media, setMedia] = useState<any | null>(null);

  const showModal = async (record: any) => {
    console.log(record);
    await setSelectedPost(record.data);
    await setMedia(record.image);
    await setOpen(true);
  };

  const closeModel = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchDataPost();
  }, []);

  const fetchDataPost = async () => {
    const data = await getPostsData();

    const formatPostData = data.map((post: any) => ({
      key: post.ID,
      pid: post.ID,
      profilepicture: post.User.profilepicture,
      username: post.User.username,
      like: post.Likes.length,
      comment: post.Comments.length,
      data: post,
      image: JSON.parse(post.Image),
    }));

    setData(formatPostData);
  };

  const [data, setData] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "pid",
      key: "pid",
    },
    {
      title: "Profile Picture",
      dataIndex: "profilepicture",
      key: "profilepicture",
      render: (src: any) => (
        <Image
          src={process.env.NEXT_PUBLIC_BASE_API + "images/" + src}
          alt={src}
          width={50}
        />
      ),
    },
    {
      title: "Owner",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Action",
      key: "action",
      render: (index: any, text: any, record: any) => (
        <Button className="bg-blue-500" onClick={() => showModal(index)}>
          แสดงรายละเอียด
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={data!} columns={columns} />
      <Modal
        title="Detail Post"
        open={open}
        onCancel={closeModel}
        onOk={closeModel}
      >
        <>
          {selectedPost != null ? (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md dark:bg-gray-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {selectedPost && selectedPost.User && (
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BASE_API +
                        "images/" +
                        selectedPost.User.profilepicture
                      }
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-gray-800 font-semibold dark:text-white">
                      {selectedPost.User && selectedPost.User.username}
                    </p>
                    <p className="text-gray-500 text-sm dark:text-gray-100">
                      {selectedPost.CreatedAt &&
                        new Date(selectedPost.CreatedAt).toLocaleDateString(
                          "th-TH"
                        )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-800 dark:text-white">
                  {selectedPost.content}
                </p>
              </div>

              <div className="mb-4">
                {selectedPost != null && selectedPost.User != null ? (
                  <div></div>
                ) : (
                  <></>
                )}
                {selectedPost != null &&
                selectedPost.Image != null &&
                media  != null && media.length > 1 &&
                selectedPost.contenttype === "picture" ? (
                  <div className="grid grid-cols-2 gap-4">
                    {media.map((img: any, index: any) => (
                      <div key={index}>
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_BASE_API + "images/" + img
                          }
                          alt={img}
                          width={250}
                        />
                      </div>
                    ))}
                  </div>
                ) : media != null &&
                  media.length > 0 &&
                  selectedPost.contenttype === "picture" ? (
                  <div className="text-center">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BASE_API + "images/" + media[0]
                      }
                      alt={media[0]}
                      width={250}
                    />
                  </div>
                ) : (
                  <div>Test</div>
                )}
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-2">
                  <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 dark:text-white">
                    <svg
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>
                      {selectedPost.Likes != null
                        ? selectedPost.Likes.length
                        : 0}{" "}
                      Likes
                    </span>
                  </button>
                </div>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1  dark:text-white">
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                      ></path>
                    </g>
                  </svg>
                  <span className="dark:text-white">
                    {selectedPost.Comments != null
                      ? selectedPost.Comments.length
                      : 0}{" "}
                    Comment
                  </span>
                </button>
              </div>
              <hr className="mt-2 mb-2" />
              <p className="text-gray-800 font-semibold">Comment</p>
              <hr className="mt-2 mb-2" />

              {selectedPost.Comments != null ? (
                <>
                  {selectedPost.Comments.map(
                    (comment, index) =>
                      comment.User && (
                        <div className="mt-4" key={index}>
                          <div className="flex items-center space-x-2">
                            <img
                              src={
                                process.env.NEXT_PUBLIC_BASE_API +
                                "images/" +
                                comment.User.profilepicture
                              }
                              alt="User Avatar"
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <p className="text-gray-800 font-semibold  dark:text-white">
                                {comment.User.username}
                              </p>
                              <p className="text-gray-500 text-sm  dark:text-white">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      </Modal>
    </>
  );
};

export default Page;
