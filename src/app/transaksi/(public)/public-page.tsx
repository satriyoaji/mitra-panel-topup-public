import React from "react";
import SearchList from "./search-list";

function PublicPage() {
  return (
    <div className="bg-no-repeat bg-center lg:bg-primary rounded-xl">
      <div className="h-full min-h-[80vh] flex pt-4 md:pt-16 md:px-0 bg-gradient-to-b from-background to-white/50 items-center flex-col">
        <div className="max-w-[60rem] bg-opacity-90 min-h-full w-full">
          <div className="px-4">
            <p>RIWAYAT TRANSAKSI</p>
            <p className="text-3xl max-w-[40rem] mt-4 font-semibold">
              Lacak Pesananmu
            </p>
          </div>
          <SearchList />
        </div>
      </div>
    </div>
  );
}

export default PublicPage;
