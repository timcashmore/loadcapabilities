context app.capabilities {

    entity BusinessCapabilities {
        key CapabilityId          : Integer;
            LoBId                 : Integer;
            BusinessAreaId        : Integer;
            BusinessArea          : String;
            Capability            : String;
            CapabilityDescription : LargeString;
            ImplementedBy         : Integer;
    }


}
