import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import { useAppDispatch } from "@/states/hooks";
import { appActions, BreadCrumbItem } from "@/app/states/appState";
import { ChildrenProps } from "@/app/types/ChildrenProps";

interface Props extends ChildrenProps {
  breadcrumbs: BreadCrumbItem[];
}

export const WithBreadcrumbs = ({ children, breadcrumbs }: Props) => {
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    dispatch(appActions.setBreadcrumbs(breadcrumbs));
  }, []);

  return <>{children}</>;
};
