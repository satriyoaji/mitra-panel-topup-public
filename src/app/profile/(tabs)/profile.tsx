import { Label } from "@/components/ui/label";
import React from "react";
import { IProfile } from "@/Type";

type prop = {
  data: IProfile | null;
};

function Profile(props: prop) {
  return (
    <>
      <div className="w-full space-y-3 max-w-md">
        <div className="md:grid md:grid-cols-3 space-y-1 md:space-y-0 w-full items-center">
          <Label className="text-sm text-muted-foreground">Nama</Label>
          <p className="text-sm">{props?.data?.name}</p>
        </div>
        <div className="md:grid md:grid-cols-3 space-y-1 md:space-y-0 w-full items-center">
          <Label className="text-sm text-muted-foreground">Email</Label>
          <p className="text-sm">{props?.data?.email}</p>
        </div>
        <div className="md:grid md:grid-cols-3 space-y-1 md:space-y-0 w-full items-center">
          <Label className="text-sm text-muted-foreground">No. Whatsapp</Label>
          <div className="flex space-x-4">
            <p className="text-sm">{props?.data?.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
