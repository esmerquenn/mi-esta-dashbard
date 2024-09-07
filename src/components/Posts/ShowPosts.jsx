import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  useDeletePostsMutation,
  useGetDesignPostsQuery,
  useGetInvestmentPostsQuery,
  useGetPostsQuery,
  useGetRepairPostsQuery,
  useSearchPostsQuery,
} from "../../api/slices/posts";
import React, { useEffect, useState } from "react";
import { Image, Spin } from "antd";
import { PencilIcon } from "@heroicons/react/24/outline/index.js";
import Empty from "../ChildComponents/Empty.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";
import { Link } from "react-router-dom";
import { showAlertError, showAlertSuccess } from "../Alerts/showAlert.jsx";

const TABS = [
  { label: "All", value: "all" },
  { label: "Design", value: "DESIGN" },
  { label: "Repair", value: "REPAIR" },
  { label: "Investment", value: "INVESTMENT" },
];

export function ShowPosts() {
  const [page, setPage] = useState(0);

  const { data: allPosts, isLoading } = useGetPostsQuery(page);
  const { data: designPosts } = useGetDesignPostsQuery(page);
  const { data: repairPosts } = useGetRepairPostsQuery(page);
  const { data: investmentPosts } = useGetInvestmentPostsQuery(page);
  const [deletePost, { isLoading: isLoadingDeletePost }] = useDeletePostsMutation();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);

  const [keyboard, setKeyboard] = useState("");
  const { data: searchPosts, error: searchError, isLoading: searchLoading } = useSearchPostsQuery(query);

  useEffect(() => {
    if (keyboard) {
      const timeout = setTimeout(() => {
        setQuery(keyboard);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [keyboard]);

  useEffect(() => {
    if (allPosts) {
      setPosts(allPosts);
    }
  }, [allPosts]);

  // CHANGE CATEGORY TAB
  function changeTab(value) {
    const newData =
      value === "DESIGN" ? designPosts : value === "REPAIR" ? repairPosts : value === "INVESTMENT" ? investmentPosts : allPosts;
    setPosts(newData);
  }

  const handleDeletePost = (id) => {
    try {
      const response = deletePost(id);
      if (response) {
        showAlertSuccess("Post silindi!");
      }
    } catch (err) {
      showAlertError("Post silinərkən xəta baş verdi!");
    }
  };

  const handleSearch = (e) => {
    setKeyboard(e.target.value);
    if (!searchLoading) {
      setPosts(searchPosts);
    }
  };

  if (isLoading) {
    return (
      <div className=" h-[50vh] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Card className="h-full w-full p-2">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab onClick={() => changeTab(value)} key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72 p-2">
              <Input onChange={handleSearch} label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Şəxs
                  </Typography>
                </th>
                <th className=" text-right border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 pr-14 ">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Düzəliş et
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts?.map((post, index) => {
                  const isLast = index === posts.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={post.id}>
                      <td className={classes}>
                        <div className="flex avatar items-center gap-3">
                          <Image className=" rounded-md" width={60} src={post.thumbnail} size="sm" alt={post.title} />
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {post.title}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={` text-right pr-10  ${classes}`}>
                        <Tooltip content="Edit User">
                          <Link to={`posts/update/${post.id}`}>
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip content="Delete User">
                          <IconButton onClick={() => handleDeletePost(post.id)} variant="text">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={2}>
                    <Empty />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center  my-5 gap-4 justify-center">
            {page > 0 && (
              <Button onClick={() => setPage((prev) => prev - 1)} variant="gradient">
                Öncəki
              </Button>
            )}
            {posts.length === 10 && (
              <Button onClick={() => setPage((prev) => prev + 1)} variant="gradient">
                Sonrakı
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
