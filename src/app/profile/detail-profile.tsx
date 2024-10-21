import { IProfile } from "@/Type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PhoneInputIndo } from "@/components/ui/custom-input";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type prop = {
  data: IProfile | null;
  onSuccess: () => void;
};

function DetailProfile(props: prop) {
  const { data: session, update } = useSession();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    setName(props.data?.name ? session?.profile?.name : "");
    setEmail(props.data?.email ? session?.profile?.email : "");
    setPhone(props.data?.phone ? session?.profile?.phone : "");
  }, []);

  const handleSubmit = async () => {
    const body = {
      name,
      email,
      phone: `62${phone}`,
    };

    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const res = await response.json();
      return toast({
        title: "Failed",
        description: res.remark,
        variant: "destructive",
      });
    }

    if (session) {
      await update({
        ...session,
        profile: {
          ...session.profile,
          body,
        },
      });
    }
    props.onSuccess();
    await update();
    return toast({
      title: "Success",
      description: "Update profile success",
      variant: "success",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-4">
        <Avatar className="my-3 h-16 w-16">
          <AvatarImage
            src={session?.user?.image as string}
            alt={session?.user?.name as string}
          />
          <AvatarFallback>{session?.user?.name?.at(0) ?? ""}</AvatarFallback>
        </Avatar>
        <div className="w-full my-1.5">
          <Label htmlFor="invoice">Nama</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Masukan Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="w-full my-1.5">
          <Label htmlFor="invoice">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Masukan Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full my-1.5">
          <Label htmlFor="invoice">No. Whatsapp</Label>
          <PhoneInputIndo
            onValueChange={(e) => {
              setPhone(`${e}`);
            }}
            value={phone ?? ""}
            placeholder="Masukan No. Whatsapp"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Simpan</Button>
      </DialogFooter>
    </>
  );
}

export default DetailProfile;
