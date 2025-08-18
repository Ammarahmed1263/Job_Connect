import { AppButton, AppText } from "@components/ui";
import { Certification } from "@type/userTypes";
import React from "react";
import { View } from "react-native";
import CertificateItem from "./CertificateItem";

type CertificateListProps = {
  certificates: Certification[];
  handleEdit: (certificate: Certification) => void;
  handleDelete: (certificate: Certification) => void;
  handleAddNew: () => void;
};

const CertificateList = ({
  certificates,
  handleEdit,
  handleDelete,
  handleAddNew,
}: CertificateListProps) => (
  <View className="flex-1 justify-between">
    <View>
      {certificates.length > 0 ? (
        <View className="mb-4">
          {certificates.map((cert, index) => (
            <CertificateItem
              key={`${cert.certificationName}-${index}`}
              item={cert}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </View>
      ) : (
        <View className="items-center justify-center py-8">
          <AppText className="text-[--text-muted] text-center mb-4">
            You haven't added any certificates yet.
          </AppText>
        </View>
      )}
    </View>
    
    <View className="mt-auto pt-4">
      <AppButton
        title="Add New Certificate"
        onPress={handleAddNew}
        className="py-3"
      />
    </View>
  </View>
);

export default CertificateList;