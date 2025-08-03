import { AppButton, AppText } from "@components/ui";
import {
  educationLevelOptions,
  experienceLevelOptions,
  jobTypeOptions,
  workingModelOptions,
} from "@constants/filterOptions";
import { useTheme } from "@contexts/ThemeContext";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useFilterStore } from "@store/filterStore";
import { Filters } from "@type/filterTypes";
import { applyAndDismissFilters } from "@utils";
import clsx from "clsx";
import React, { forwardRef, RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FilterSection,
  LocationFilter,
  SalaryRangeFilter,
  SegmentedControlFilter
} from "./filter-inputs";

interface FiltersSheetProps {}

export const FiltersSheet = forwardRef<BottomSheetModal, FiltersSheetProps>(
  (props, ref) => {
    const {
      filters,
      setFilters,
      resetFilters: resetStoreFilters,
    } = useFilterStore();
    const {
      control,
      handleSubmit,
      reset,
      watch,
      clearErrors,
      formState: { isValid },
    } = useForm<Filters>({
      defaultValues: filters,
      mode: "onChange",
      reValidateMode: "onChange",
    });
    const internalRef =
      (ref as RefObject<BottomSheetModal>) ?? useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const snapPoints = useMemo(() => ["85%", "90%"], []);

    const handleClearFilters = () => {
      reset(filters);
      resetStoreFilters();
      // Optionally dismiss after clearing
      // if (typeof ref !== 'function' && ref && ref.current) { ref.current.dismiss(); }
    };

    useEffect(() => {
      reset(filters);
    }, [filters, reset]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={internalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        handleIndicatorStyle={{ backgroundColor: colors["--border-color"] }}
        backgroundStyle={{ backgroundColor: colors["--card-color"] }}
        keyboardBlurBehavior="restore"
      >
        <>
          <View className="flex-row justify-between items-center px-4 mb-6">
            <AppText
              variant="bold"
              className="text-[--text-primary] text-center"
            >
              Filters
            </AppText>
            <AppButton
              title="Reset Filter"
              onPress={handleClearFilters}
              textVariant="medium"
              textClassName="!text-[--accent-color]"
              disableRipple
              disableShadow
              flat
            />
          </View>
          <BottomSheetScrollView
            contentContainerStyle={{
              marginBottom: insets.bottom,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <FilterSection title="Location">
              <LocationFilter name="location" control={control} clearErrors={clearErrors}/>
            </FilterSection>

            <FilterSection title="Working Model">
              <SegmentedControlFilter
                name="workplace"
                control={control}
                options={workingModelOptions}
              />
            </FilterSection>

            <FilterSection title="Job Type">
              <SegmentedControlFilter
                name="jobType"
                control={control}
                options={jobTypeOptions}
              />
            </FilterSection>

            <FilterSection title="Salary">
              <SalaryRangeFilter
                minSalaryName="minSalary"
                maxSalaryName="maxSalary"
                watch={watch}
                control={control}
                clearErrors={clearErrors}
              />
            </FilterSection>

            <FilterSection title="Level of Experience">
              <SegmentedControlFilter
                name="experience"
                control={control}
                options={experienceLevelOptions}
              />
            </FilterSection>

            <FilterSection title="Education">
              <SegmentedControlFilter
                name="education"
                control={control}
                options={educationLevelOptions}
              />
            </FilterSection>

            <View
              className=" gap-4 justify-between px-4 pt-4 items-center"
              style={{ paddingBottom: insets.bottom + 32 }}
            >
              {!isValid && (
                <AppText className="text-center !text-[--error-color]">
                  Please fix the errors above.
                </AppText>
              )}
              <AppButton
                title="Apply"
                onPress={handleSubmit((data) =>
                  applyAndDismissFilters(data, ref, setFilters)
                )}
                wrapperClassName={clsx(
                  "w-full !rounded-full mx-2",
                  !isValid && "bg-[--text-muted] opacity-0.5"
                )}
                disableShadow={!isValid}
                className="py-2"
                disabled={!isValid}
              />
            </View>
          </BottomSheetScrollView>
        </>
      </BottomSheetModal>
    );
  }
);
