import React from "react";
import LoadingIndicator from "./LoadingIndicator";

type LayoutProps = {
  children: React.ReactElement;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="Background">
      <div className="Header">
        <div className="Title">Vote as a Service</div>
      </div>

      <div className="Main">
        <div className="Container">
          <React.Suspense
            fallback={
              <LoadingIndicator title="Loading the Page... please wait" />
            }
          >
            {children}
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
