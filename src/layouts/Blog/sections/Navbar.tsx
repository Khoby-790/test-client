import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowDownOnSquareStackIcon,
  DocumentIcon,
  Bars3Icon,
  CogIcon,
  XMarkIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Menu,
  Modal,
  UnstyledButton,
  Text,
  Group,
} from "@mantine/core";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import Show from "../../../components/Show";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import _ from "lodash";
import { logout } from "../../../features/userSlice";
import { IconChevronRight } from "@tabler/icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  return (
    <Fragment>
      <Popover className="relative bg-white">
        <div className="mx-auto  px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Show if={_.isNull(user)}>
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                <button
                  onClick={() => setShowSignIn(true)}
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </button>
                <button
                  onClick={() => setShowSignUp(true)}
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </button>
              </div>
            </Show>
            <Show if={!_.isNull(user)}>
              <Menu shadow="sm">
                <Menu.Target>
                  <UnstyledButton>
                    <Group>
                      <Avatar radius="xl">BH</Avatar>.
                      <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                          {user?.first_name} {user?.last_name}
                        </Text>

                        <Text color="dimmed" size="xs">
                          {user?.email}
                        </Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>menu</Menu.Label>
                  <Menu.Item icon={<DocumentIcon className="h-6 w-6" />}>
                    <Link to="/create-post">Create new post</Link>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => dispatch(logout())}
                    color="red"
                    icon={<ArrowDownOnSquareStackIcon className="h-6 w-6" />}
                  >
                    Sign oout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Show>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <Modal
        opened={showSignIn}
        onClose={() => setShowSignIn(false)}
        title="Welcome!"
        size={600}
      >
        <SignInForm setClose={setShowSignIn} />
      </Modal>

      <Modal
        opened={showSignUp}
        onClose={() => setShowSignUp(false)}
        title="Introduce yourself!"
        size={600}
      >
        <SignUpForm setClose={setShowSignUp} />
      </Modal>
    </Fragment>
  );
}
